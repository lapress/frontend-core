import Elasticsearch from 'elasticsearch';

import { config } from '../../index';

export const quickSearchByQuery = ({ query, start = 0, size = 12, includeFields = ['*'], excludeFields = [], sort = 'date', sortOrder = 'desc' }) => {
  const client = new Elasticsearch.Client({
    node: config.data.elasticsearch.host,
    host: config.data.elasticsearch.host,
    index: config.data.elasticsearch.index
  });

  const body = query.size(size)
    .from(start)
    .sort(sort, sortOrder)
    .build();

  return new Promise((resolve, reject) => {
    client.search({
      index: config.data.elasticsearch.index,
      _sourceIncludes: includeFields,
      _sourceExcludes: excludeFields,
      body
    }).then((res) => {
      resolve(res);
    }).catch((e) => {
      reject(e);
    });
  });
};
