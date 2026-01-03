// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicketNFT is ERC721, ERC721Enumerable, Ownable {
    uint256 private _tokenIds;
    string private _baseTokenURI;
    
    mapping(uint256 => uint256) public ticketMintTimestamp;
    
    event TicketMinted(address indexed attendee, uint256 indexed tokenId, uint256 timestamp);
    
    constructor() ERC721("TicketToWeb3", "TTW3") Ownable(msg.sender) {
        _baseTokenURI = "ipfs://QmYourBaseURI/";
    }
    
    function mintTicket(address attendee) public returns (uint256) {
        require(attendee != address(0), "Cannot mint to zero address");
        
        _tokenIds++;
        uint256 newTicketId = _tokenIds;
        
        _safeMint(attendee, newTicketId);
        ticketMintTimestamp[newTicketId] = block.timestamp;
        
        emit TicketMinted(attendee, newTicketId, block.timestamp);
        
        return newTicketId;
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function totalMinted() public view returns (uint256) {
        return _tokenIds;
    }
    
    // Required overrides for ERC721Enumerable
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}