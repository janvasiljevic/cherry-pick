package api

import (
	"github.com/gofiber/fiber/v2"
	"nft-backend/internal/nfts"
)

type MintNft struct {
	ContractName    string `json:"contract_name"`
	Address         string `json:"address"`
	ContractAddress string `json:"contract_address"`
}

func CreateNft(c *fiber.Ctx) error {
	mintNft := MintNft{}
	if err := c.BodyParser(&mintNft); err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"success": false,
			"message": err,
			"data":    nil,
		})
	}

	success := nfts.MintNft(mintNft.ContractName, mintNft.Address, mintNft.ContractAddress)
	if success != "Successful" {
		return c.Status(400).JSON(&fiber.Map{
			"success": false,
			"message": "",
			"data":    success,
		})
	}
	return c.Status(200).JSON(&fiber.Map{
		"success": true,
		"message": "",
		"data":    success,
	})
}
