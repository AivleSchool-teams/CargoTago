import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Message = (props) => {
    const messageContent = props.messageContent;

    return (
        <MessageContainer>
            <div>
                <MessageBody>
                    <MessageText>{messageContent.message}</MessageText>
                </MessageBody>
                <MessageSub>
                    <Time>{messageContent.time}</Time>
                    <Author>{messageContent.author}</Author>
                </MessageSub>
            </div>
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-end')};
  padding: 0 10px;
  box-sizing: border-box;
`;
// align-items: center;
const MessageBody = styled.div`
  max-width: 550px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  margin: 0 3px;
  padding: 2px 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  background-color: ${({ who }) => (who === 'me' ? '#d3e8fb' : '#00498c')};
`;

const MessageText = styled.p`
  margin: 5px;
`;

const MessageSub = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  margin-right: ${({ who }) => (who === 'me' ? '10px' : '')};
  margin-left: ${({ who }) => (who === 'me' ? '' : '10px')};
`;

const Time = styled.p`
  margin-top: 5px;
  margin-right: 5px;
`;

const Author = styled.p`
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
`;