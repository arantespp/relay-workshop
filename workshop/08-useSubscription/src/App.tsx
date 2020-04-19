import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';

import Feed from './Feed';

import { AppQuery } from './__generated__/AppQuery.graphql';
import { useNewPostSubscription } from './postSubscription/useNewPostSubscription';

const App = () => {
  const query = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        ...Feed_query
        me {
          id
        }
      }
    `,
  );

  const { me } = query;

  useNewPostSubscription(me);

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Feed query={query} />
      </Flex>
    </Content>
  );
};

export default App;
