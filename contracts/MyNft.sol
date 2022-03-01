//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNft is ERC721 {
uint256 public totalSupply = 0;

constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_)
{}
//全部来自ERC721

function mint() public {
    totalSupply++;
    _mint(msg.sender, totalSupply);
}

function _baseURI() internal pure override returns (string memory) {
    return "https://mydomain.com/";
}

function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
) internal override {}

function total() public view returns (uint) {


    return   totalSupply;


}













function supportsInterface(bytes4 interfaceId) public view override returns (bool)
{
    return super.supportsInterface(interfaceId);
}
}
