package nfts

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"os/exec"
	"strings"
)

func deployContract(contractName string) (string, string) {
	cmd := exec.Command("web3", "contract", "deploy", fmt.Sprintf("contracts/build/%s/%s.bin", contractName, contractName))
	stdout, err := cmd.Output()

	if err != nil {
		log.WithFields(log.Fields{"error": err, "output": string(stdout)}).Error("error executing deploy contract command")
	}

	log.WithFields(log.Fields{"output": string(stdout)}).Debug("deploy contract raw output")
	output := string(stdout)
	contractTransaction := strings.Split(strings.Split(output, "\n")[0], ":")[1]
	contractAddress := strings.Split(strings.Split(output, "\n")[1], ":")[1]
	log.WithFields(log.Fields{"contract_transaction": contractTransaction, "contract_address": contractAddress}).Info("contract deploy details")
	return contractTransaction, contractAddress
}
