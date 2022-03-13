package api

import (
	"github.com/gofiber/fiber/v2"
	"nft-backend/internal/nfts"
)

type ContractData struct {
	Name    string `json:"name"`
	Symbol  string `json:"symbol"`
	BaseUri string `json:"base_uri"`
}

func CreateContract(c *fiber.Ctx) error {
	cd := ContractData{}
	if err := c.BodyParser(&cd); err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"success": false,
			"message": err,
			"data":    nil,
		})
	}

	_, contractAddress := nfts.CreateAndDeployNewNft(cd.Name, cd.Symbol, cd.BaseUri)
	return c.Status(200).JSON(&fiber.Map{
		"success": true,
		"message": "",
		"data":    contractAddress,
	})
}
