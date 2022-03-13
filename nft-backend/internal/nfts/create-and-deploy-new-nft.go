package nfts

func CreateAndDeployNewNft(name string, symbol string, baseUri string) (string, string) {
	generateErc721Contract(name, symbol, baseUri)
	buildContract(name)
	contractTransaction, contractAddress := deployContract(name)
	return contractTransaction, contractAddress
}
