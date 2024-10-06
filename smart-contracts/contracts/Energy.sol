// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Energy {

    error AddressZeroDetected();
    error ZeroValueNotAllowed();
    error ProducerAlreadyRegistered();
    error NotEnoughEnergyCredits();
    error InsufficientTokenBalance();
    error InsufficientBuyerCredits();
    error TransferFailed();
    error OnlyOwnerAllowed();
    error OnlyProducerAllowed();
    error InsufficientBalance();
    error CallerNotProducer();
    error UpdatedpriceIsSame();
    

    address public owner;
    address public energyToken;

    // Array to store all producer addresses
    address[] private allProducerAddresses;

    constructor(address _energyToken) {
        owner = msg.sender;
        energyToken = _energyToken;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyProducer {
        require(isUserProducer[msg.sender], "Caller is not a producer");
        _;
    }

    struct Producer {
        address producerAddress;
        uint energyCredits;
        uint pricePerUnit;
        uint tokenBalance;
    }

    event ProducerRegistered(address producer, uint energyCredits, uint pricePerUnit);
    event UnitsUpdated(address producer, uint energyCredits);
    event PriceUpdated(address producer, uint pricePerUnit);
    event EnergyCreditsPurchased(address buyer, address producer, uint creditAmount);
    event EnergyCreditsTransferred(address from, address to, uint creditAmount);
    event EnergyUsageTracked(address buyer, uint usageAmount);
    event ProducerWithdrawal(address producer, uint amount);


    // Mapping to store registered producers
    mapping(address => Producer) public producers;

    // Mapping to store balances of users
    mapping(address => uint) public balances;

    // Mapping to store energy credits for buyers
    mapping(address => mapping(address => uint)) public buyerCredits; // producer => buyer => credits
    mapping(address => uint) public energyUsage;

    mapping (address => bool) public isUserProducer;

    // Producers can register their available energy credits and the price per unit
    function registerProducer(uint _energyCredits, uint _pricePerUnit) external {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        if (_energyCredits == 0 || _pricePerUnit == 0) revert ZeroValueNotAllowed();

        // Check if this producer is already in the system
        if (producers[msg.sender].energyCredits != 0) revert ProducerAlreadyRegistered();
        
        // Register the producer with the provided details
        producers[msg.sender] = Producer(msg.sender, _energyCredits, _pricePerUnit, 0);

        // Add the new producer to the array
        allProducerAddresses.push(msg.sender);
        isUserProducer[msg.sender] = true;
        
        // Log the producer registration
        emit ProducerRegistered(msg.sender, _energyCredits, _pricePerUnit);
    }

    

    // Producers can update the amount of energy credits they have available
    function updateEnergyCredits(uint _newCredits) external onlyProducer {
        if (msg.sender == address(0)) revert AddressZeroDetected();

        if (producers[msg.sender].energyCredits == _newCredits) revert UpdatedpriceIsSame();

        if (_newCredits == 0) revert ZeroValueNotAllowed();

        // Update the producer’s energy credits
        producers[msg.sender].energyCredits = _newCredits;

        // Log the update
        emit UnitsUpdated(msg.sender, _newCredits);
    }

    // Producers can update the price per energy unit they are selling
    function updatePricePerUnit(uint _newPrice) external onlyProducer {

        if (msg.sender == address(0)) revert AddressZeroDetected();

        if (producers[msg.sender].pricePerUnit == _newPrice) revert UpdatedpriceIsSame();
       
        if (_newPrice == 0) revert ZeroValueNotAllowed();

        // Update the price per unit
        producers[msg.sender].pricePerUnit = _newPrice;

        // Log the price update
        emit PriceUpdated(msg.sender, _newPrice);
    }

    // Buyers can purchase energy credits from a specific producer
    // This transfers tokens from the buyer to the producer and updates both parties' credit balances
    function purchaseEnergyCredits(address producer, uint creditAmount) external {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        if (producer == address(0)) revert AddressZeroDetected();
        if (creditAmount == 0) revert ZeroValueNotAllowed();
        
        Producer storage _producer = producers[producer];
        
        // Make sure the producer has enough energy credits to sell
        if (_producer.energyCredits < creditAmount) revert NotEnoughEnergyCredits();
        
        // Calculate how much the buyer needs to pay in tokens
        uint totalCost = creditAmount * _producer.pricePerUnit;
        
        // Check if the buyer has enough tokens to make the purchase
        if (IERC20(energyToken).balanceOf(msg.sender) < totalCost) revert InsufficientTokenBalance();
        
        // Transfer the tokens from the buyer to the producer
        bool success = IERC20(energyToken).transferFrom(msg.sender, address(this), totalCost);
        if (!success) revert TransferFailed();

        // Deduct the sold credits from the producer's balance
        _producer.energyCredits -= creditAmount;

        // add token to producers balance
        _producer.tokenBalance += totalCost;

        // Add the purchased credits to the buyer's balance
        buyerCredits[producer][msg.sender] += creditAmount;

        // Log the purchase of energy credits
        emit EnergyCreditsPurchased(msg.sender, producer, creditAmount);
    }

    // Buyers can transfer energy credits to another user
    // This moves energy credits from the sender’s balance to the recipient’s balance
    function transferEnergyCredits(address producer, address to, uint creditAmount) external {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        if (to == address(0)) revert AddressZeroDetected();
        if (creditAmount == 0) revert ZeroValueNotAllowed();

        // Make sure the sender has enough credits for the specified producer
        uint senderCredits = buyerCredits[producer][msg.sender];
        if (senderCredits < creditAmount) revert InsufficientBuyerCredits();

        // Reduce the sender’s credit balance for that producer
        buyerCredits[producer][msg.sender] -= creditAmount;

        // Increase the recipient’s credit balance for that producer
        buyerCredits[producer][to] += creditAmount;

        // Log the transfer of energy credits
        emit EnergyCreditsTransferred(msg.sender, to, creditAmount);
    }

    // Allow producers to withdraw their balance
    function withdraw(uint amount) external onlyProducer {

        if (msg.sender == address(0)) revert AddressZeroDetected();
        if (amount == 0) revert ZeroValueNotAllowed();
        
        Producer storage _producer = producers[msg.sender];
        if (_producer.tokenBalance < amount) revert InsufficientBalance();

        
        // add token to producers balance
        _producer.tokenBalance -= amount;

        bool success = IERC20(energyToken).transfer(msg.sender, amount);
        if (!success) revert TransferFailed();

        emit ProducerWithdrawal(msg.sender, amount);
    }

    // Get the balance of a producer
    function getBalance() external view onlyProducer returns (uint) {
        return producers[msg.sender].tokenBalance;
    }

    // Get the credit balance of a buyer from a specific producer
    function creditBalanceOf(address producer, address buyer) external view returns(uint256) {
        return buyerCredits[producer][buyer];
    }

    // Get the token balance of this contract
    function getContractBalance() external view onlyOwner returns (uint) {
        return IERC20(energyToken).balanceOf(address(this));
    }


    function getAllProducers() external view returns (Producer[] memory) {
        Producer[] memory allProducers = new Producer[](allProducerAddresses.length);
        for (uint i = 0; i < allProducerAddresses.length; i++) {
            allProducers[i] = producers[allProducerAddresses[i]];
        }
        return allProducers;
    }

}