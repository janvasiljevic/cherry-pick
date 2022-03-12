package nfts

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"os/exec"
	"strings"
)

func MintNft(contractName string, address string, contractAddress string) string {
	cmd := exec.Command("web3", "contract", "call", "--address", contractAddress, "--wait", "--abi", fmt.Sprintf("contracts/build/%s/%s.abi", contractName, contractName), "--gas-limit", "2000000", "--function", "mint", address)
	stdout, err := cmd.Output()

	if err != nil {
		log.WithFields(log.Fields{"error": err, "output": string(stdout)}).Error("error executing mint nft command")
	}

	log.WithFields(log.Fields{"output": string(stdout)}).Debug("mint nft raw output")
	var success string
	mintInfo := strings.Split(string(stdout), "\n")
	for _, mI := range mintInfo {
		if strings.Split(mI, ":")[0] == "Status" {
			success = strings.Split(mI, ":")[1]
		}
	}
	return strings.TrimSpace(success)
}
