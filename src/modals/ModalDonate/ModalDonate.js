import { withModal } from '../../lib/modalManager/withModal'
import { Chip, Currency, ItemsRow, Text } from '../../theme/components'
import {
    ModalCol,
    ModalCopyLink,
    ModalFooter,
    ModalRow,
    ModalWrapper,
} from './ModalDonate.style'
import React, { useState } from 'react'
import { QrCode } from './QrCode'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { donationWallets } from '../../contants'
import { Subscribe } from './Subscribe'

const strings = {
    copyButton: 'Copy Address',
    description:
        'Your donation will be used as reserve and converted to cUSD overtime to fund communities in urgent need and running out of funds.',
    scan:
        'Scan or copy/paste the address below into your wallet. Only send {{currency}} to this address.',
    subscribing:
        'By subscribing you will get updates about our progress, new features and impact measurement.',
}

const currencies = [
    { label: 'BITCOIN', name: 'BTC' },
    { label: 'ETH / ERC20', name: 'ETH/ERC20' },
    { label: 'CELO / cUSD', name: 'CELO' },
]

export const Modal = () => {
    const [isSelected, setIsSelected] = useState(currencies[0].name)

    const getSelectedCurrencyAddress = () => donationWallets[isSelected]

    const handleChipClick = (address, name) => {
        if (name === isSelected) {
            return
        }

        setIsSelected(name)
    }

    return (
        <>
            <ModalWrapper>
                <Text>{strings.description}</Text>
                <div
                    style={{
                        margin: '24px -32px 0 -32px',
                        paddingLeft: 32,
                        paddingRight: 32,
                        overflow: 'auto',
                    }}
                >
                    <ItemsRow>
                        {currencies.map(({ address, icon, label, name }) => (
                            <Chip
                                as="a"
                                isActive={isSelected === name}
                                key={name}
                                onClick={() => handleChipClick(address, name)}
                                noUppercase
                            >
                                {label}
                                <Currency
                                    currency={name}
                                    style={{ marginLeft: 8 }}
                                />
                            </Chip>
                        ))}
                    </ItemsRow>
                </div>
                <ModalRow style={{ marginTop: 16 }}>
                    <ModalCol>
                        <Text>
                            {strings.scan.replace('{{currency}}', isSelected)}
                        </Text>
                        <Text
                            lead1
                            bold
                            style={{
                                marginTop: 10,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {getSelectedCurrencyAddress()}
                        </Text>
                        <ModalCopyLink style={{ marginTop: 16 }}>
                            <CopyToClipboard
                                text={getSelectedCurrencyAddress()}
                            >
                                <Text p06 bold>
                                    {strings.copyButton}
                                </Text>
                            </CopyToClipboard>
                        </ModalCopyLink>
                    </ModalCol>
                    <ModalCol>
                        <QrCode address={getSelectedCurrencyAddress()} />
                    </ModalCol>
                </ModalRow>
            </ModalWrapper>
            <ModalFooter>
                <Text bold>{strings.subscribing}</Text>
                <Subscribe style={{ marginTop: 8 }} />
            </ModalFooter>
        </>
    )
}

export const ModalDonate = withModal(Modal);
