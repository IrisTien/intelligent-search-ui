export const APP = {
  BASE_IMAGE_PATH: '../../../assets/images/',
  NEO4J: {
    USER: 'neo4j',
    PASSWORD: 'test',
    URL: 'bolt://10.117.43.215:7687'
  },
  QUERY: {
    ORG: `
      match (p:Person)-[:reportTo]->(m:Person)
      return p,m;`,
    IDEAS: `
      match (p:Person)-[sub:submitterOf]->(i:TechIdea)
      match (p)-[rep:reportTo*1..2]->(m:Person)
      return p, i,m, rep, sub;
    `,
    BUGS_AND_ASSIGNEES: `
      match (p:Person)-[:assigneeOf]->(b:Bug)
      return p,b;`
  },
  RELATIONS: {
    BUGS_AND_ASSIGNESS: [
      {
        from: 0,
        to: 1,
        relationship: 'assignee of'
      }
    ]
  },
  RELATIONSHIP_MAP: {
    submitterOf: 'submitter of',
    reportTo: 'report to',
    assigneeOf: 'assignee of',
    foundIn: 'found in',
    isComponentOf: 'component of',
    relatedTo: 'related to'
  },
  RELATION_MAP: {
    submitterOf: {
      RELATION: 'submitter of',
      FROM: 'p',
      TO: 'i'
    },
    reportTo: {
      RELATION: 'report to',
      FROM: 'p',
      TO: 'm'
    },
    assigneeOf: {
      RELATION: 'assignee of',
      FROM: 'p',
      TO: 'b'
    },
    foundIn: {
      RELATION: 'found in',
      FROM: 'bug',
      TO: 'b'
    },
    componentOf: {
      RELATION: 'component of',
      FROM: 'com',
      TO: 'b'
    },
    relatedTo: {
      RELATION: 'related to',
      FROM: 'b',
      TO: 'c'
    }
  },
  OBJECT_IMAGES: {
    PERSON: 'user.svg',
    BUG: 'bug2.png',
    IDEA: 'idea.png',
    TECHIDEA: 'idea.png',
    BUILD: 'build2.png',
    BUILDCOMPONENT: 'buildComponent.png',
    CHANGELIST: 'change.jpg',
    DPM: 'dpm1.png',
    CUSTOMER: 'customer4.jpeg',
    CONFLUENCE: 'confluence2.png',
    FEATURECOMPONENT: 'feature.jpg'
  },
  OBJECT_COLORS: {
    PERSON: 'rgba(86,87,86,0.8)',
    BUG: 'rgba(245,118,0,0.5)',
    IDEA: 'rgba(1,110,26,0.7)',
    TECHIDEA: 'rgba(1,110,26,0.7)',
    BUILD: '',
    BUILDCOMPONENT: '',
    CHANGELIST: ''
  },
  OBJECT_LABELS: {
    PERSON: 'shortName',
    BUG: 'shortName',
    TECHIDEA: 'title',
    BUILD: 'product',
    BUILDCOMPONENT: 'product',
    CHANGELIST: 'title',
    DPM: 'summary',
    CUSTOMER: 'name',
    CONFLUENCE: 'title',
    FEATURECOMPONENT: 'name'
  },
  OBJECT_RADIUS: {
    PERSON: 35,
    IDEA: 35,
    TECHIDEA: 35,
    BUILD: 25,
    BUILDCOMPONENT: 25,
    CHANGELIST: 25,
    BUG: {
      field: 'priority',
      radius: {
        P0: 25,
        P1: 20,
        P2: 15,
        P3: 10,
        P4: 8,
        P5: 6
      }
    },
    DPM: 25,
    CUSTOMER: 25,
    CONFLUENCE: 25,
    FEATURECOMPONENT: 25
  }
};