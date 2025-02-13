// Copyright (c) 2023 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import { font, spacing } from "@brave/leo/tokens/css"
import getBraveNewsController, { FeedItemMetadata, UserEnabled } from "../shared/api"
import { channelIcons } from "../shared/Icons"
import styled from "styled-components";
import * as React from "react";
import Flex from '$web-common/Flex'
import ButtonMenu from "@brave/leo/react/buttonMenu";
import Button from "@brave/leo/react/button";
import Icon from "@brave/leo/react/icon";
import { getLocale } from '$web-common/locale';
import { getTranslatedChannelName } from "../shared/channel";

const MenuButton = styled(Button)`
  --leo-button-padding: ${spacing.s};

  flex-grow: 0;
`

export const MetaInfoContainer = styled.h4`
  --leo-icon-size: 12px;

  margin: 0;

  font: ${font.primary.xSmall.regular};
  color: var(--bn-glass-50);

  display: flex;
  align-items: center;
  gap: ${spacing.s};
`

export function MetaInfo(props: { article: FeedItemMetadata, hideChannel?: boolean }) {
  const maybeChannel = !props.hideChannel && <>
    • {channelIcons[props.article.categoryName] ?? channelIcons.default} {getTranslatedChannelName(props.article.categoryName)}
  </>

  const maybeTime = props.article.relativeTimeDescription && <>
    • {props.article.relativeTimeDescription}
  </>
  return <MetaInfoContainer>
    {props.article.publisherName} {maybeChannel} {maybeTime}
  </MetaInfoContainer>
}

export default function ArticleMetaRow(props: { article: FeedItemMetadata, hideChannel?: boolean }) {
  return <Flex direction="row" justify="space-between" align="center">
    <MetaInfo {...props} />

    <ButtonMenu>
      <MenuButton slot='anchor-content' kind='plain-faint'>
        <Icon name='more-horizontal' />
      </MenuButton>
      <leo-menu-item onClick={e => {
        getBraveNewsController().setPublisherPref(props.article.publisherId, UserEnabled.DISABLED)
        e.stopPropagation()
      }}>{getLocale('braveNewsHideContentFrom', {
        '$1': props.article.publisherName
      })}</leo-menu-item>
    </ButtonMenu>
  </Flex>
}
