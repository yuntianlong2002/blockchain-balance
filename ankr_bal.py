from ankr import AnkrWeb3
 
ankr_w3 = AnkrWeb3("https://rpc.ankr.com/eth/fc90e2d650d1b105e5de434b6c0bb7cf180f138a0a6df3dc1c46feb92c8494a4")

assets = ankr_w3.token.get_account_balance(
    wallet_address="0x77A859A53D4de24bBC0CC80dD93Fbe391Df45527",
    blockchain=["eth", "bsc"],
)

print(assets)

