package nfts

import (
	log "github.com/sirupsen/logrus"
	"os/exec"
)

func generateErc721Contract(symbol string, name string, baseUri string) {
	cmd := exec.Command("web3", "generate", "contract", "erc721", "--symbol", symbol, "--name", name, "--base-uri", baseUri)
	cmd.Dir = "contracts/raw"
	stdout, err := cmd.Output()

	if err != nil {
		log.WithFields(log.Fields{"error": err}).Error("error executing create contract command")
	}

	log.WithFields(log.Fields{"output": string(stdout)}).Debug("generate contract output")
}
