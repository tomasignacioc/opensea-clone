import Header from '../../components/Header'
import React, { useState, useEffect, useMemo } from 'react';
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router';
import NFTImage from '../../components/nft/NFTImage';
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/itemActivity';
import Purchase from '../../components/nft/Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState();
    const [listings, setListings] = useState([]);
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getNFTModule('0xD802464d0aa78f06c7eE09CE52a2B322A5e21f8A')
    }, [provider])

    // get all NFT's in the collection
    useEffect(() => {
        if (!nftModule) return

            ; (async () => {
                const nfts = await nftModule.getAll()

                const selectedNftItem = nfts.find(
                    (nft) => nft.id === router.query.nftId
                )

                setSelectedNft(selectedNftItem)
            })()
    }, [nftModule]);

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getMarketplaceModule(
            '0x1B06762bf7e8ffE2e28FdE265B407C6E7B5C6D14'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return

            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()
    }, [marketPlaceModule])

    return (
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                selectedNft={selectedNft}
                                isListed={router.query.isListed}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                    </div>
                    <ItemActivity />
                </div>
            </div>
        </div>
    )
};

export default Nft;
