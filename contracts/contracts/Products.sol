//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Products {
    struct Product {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    event AcquiredProduct(
        address indexed from,
        uint256 timestamp,
        string name,
        string messsage
    );

    event t(Product product);

    // All products
    Product[] products;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * buy product from contract owner
     * @param _name: name of the buyer
     * @param _message: message from the buyer
     */
    function buy(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy with 0");
        Product memory product = Product(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
        products.push(product);
        emit t(product);
    }

    function withdraw() public {
        require(msg.sender == owner, 'You are not the owner');
        require(owner.send(address(this).balance));
    }
}
