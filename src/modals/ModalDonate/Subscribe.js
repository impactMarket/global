import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Api from '../../services/api'
import { Button, Input, Text } from '../../theme/components'
import { mq } from '../../theme/helpers'
import { validateEmail } from '../../helpers/validateEmail'

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`

const ButtonWrapper = styled.div`
    margin-top: 16px;
    width: 100%;

    ${mq.tablet(css`
        margin-left: 14px;
        margin-top: 0;
        width: unset;
    `)}
`

const strings = {
    buttonLabel: 'Subscribe',
    placeholder: 'Enter your email...',
}

const messages = {
    invalidEmail: 'The email is not valid',
    required: 'A valid email is required',
    somethingWrong: 'Something went wrong. Try again later...',
    success: 'Thanks for subscribing!',
}

export const Subscribe = (props) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const handleChange = (event) => {
        setEmail(event?.target?.value)
        if (errorMessage) {
            setErrorMessage(null)
        }
    }

    const handleSubscribe = async () => {
        if (!email) {
            return setErrorMessage(messages.required)
        }

        if (!validateEmail(email)) {
            return setErrorMessage(messages.invalidEmail);
        }

        setIsLoading(true)
        const { success } = await Api.subscribeEmail(email)
        setIsLoading(false)

        if (!success) {
            return setErrorMessage(messages.somethingWrong)
        }

        return setSubscribed(true)
    }

    return (
        <>
            <Wrapper {...props}>
                {subscribed ? (
                    <Text>{messages.success}</Text>
                ) : (
                    <>
                        <Input
                            onChange={handleChange}
                            placeholder={strings.placeholder}
                            value={email || ''}
                        />
                        <ButtonWrapper>
                            <Button fluid isLoading={isLoading} onClick={handleSubscribe} small>
                                {strings.buttonLabel}
                            </Button>
                        </ButtonWrapper>
                    </>
                )}
            </Wrapper>
            {errorMessage && (
                <Text e06 style={{ marginTop: 8 }} XXSmall>
                    {errorMessage}
                </Text>
            )}
        </>
    )
}
