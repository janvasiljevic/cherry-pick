// @openzeppelin v4.0.0
pragma solidity ^0.8.4;

import "./lib/oz/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract Helper is ERC721PresetMinterPauserAutoId {

    constructor() public
	ERC721PresetMinterPauserAutoId("HELP", "Helper", "https://cdn-icons-png.flaticon.com/512/6212/6212780.png")
	{}

}