import { ModalBackdrop, ModalCloseButton, ModalContent, ModalHeading, ModalInnerContent, ModalWrapper } from './withModal.style';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { Text } from '../../theme/components';

export const withModal = (ModalComponent, options = {}) =>
    class Modal extends Component {
        static propTypes = {
            controller: PropTypes.object,
        };

        state = {
            options: {
                closeButtonInBackdrop: false,
                modalSize: null,
                noBackground: false,
                noCloseButton: false,
            },
        };

        componentDidMount() {
            this.setState({ options: { ...this.state.options, ...options } });

            document.addEventListener('keydown', this.handleKeyDown, false);
        }

        componentWillUnmount() {
            document.removeEventListener('keydown', this.handleKeyDown, false);
        }

        handleClose = () => {
            const { onClose } = this.props.controller;

            return onClose();
        };

        handleKeyDown = (event) => {
            const { noCloseButton } = this.state.options;

            if (event.keyCode === 27 && !noCloseButton) {
                this.handleClose();
            }
        };

        render() {
            const {
                modalSize,
                noBackground,
                noPadding,
            } = this.state.options;
            const isActive = get(this.props, 'controller.isActive');

            return (
                <ModalWrapper>
                    <ModalBackdrop isActive={isActive} />
                    <ModalContent
                        fluid={modalSize === 'fluid'}
                        fullScreen={modalSize === 'fullScreen'}
                        isActive={isActive}
                        noBackground={noBackground}
                    >
                        <ModalInnerContent noPadding={noPadding}>
                            {(this.props.heading || this.props.withCloseButton) && (
                              <ModalHeading>
                                {this.props.heading && <Text h5 semibold>{this.props.heading}</Text>}
                                {this.props.withCloseButton && <ModalCloseButton onClick={this.handleClose}><ClearIcon /></ModalCloseButton>}
                              </ModalHeading>
                            )}
                            <ModalComponent {...this.props} />
                        </ModalInnerContent>
                    </ModalContent>
                </ModalWrapper>
            );
        }
    };
