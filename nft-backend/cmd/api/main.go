package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
	log "github.com/sirupsen/logrus"
	"nft-backend/api"
)

func main() {
	app := fiber.New()

	app.Post("/create-contract", api.CreateContract)
	app.Post("/create-nft", api.CreateNft)

	app.Use(recover.New())
	log.Fatal(app.Listen(":4000"))
}
