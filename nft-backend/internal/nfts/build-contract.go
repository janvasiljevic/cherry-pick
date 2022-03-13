package nfts

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"os/exec"
)

func buildContract(contractName string) {
	cmd := exec.Command("web3", "contract", "build", fmt.Sprintf("contracts/raw/%s.sol", contractName), "-o", fmt.Sprintf("contracts/build/%s", contractName))
	stdout, err := cmd.Output()

	if err != nil {
		log.WithFields(log.Fields{"error": err}).Error("error executing build contract command")
	}

	log.WithFields(log.Fields{"output": string(stdout)}).Debug("build contract output")
}
