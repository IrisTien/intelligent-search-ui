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
      match (p:Person)-[:submitterOf]->(i:Idea)
      match (p)-[:reportTo]->(m:Person)
      return p, i,m;
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
    PERSON: 'priest_64px.png',
    BUG: 'ladybug_64px.png',
    IDEA: 'head.svg',
    TECHIDEA: 'brain.svg',
    BUILD: 'robot.svg',
    BUILDCOMPONENT: 'robot-arm.svg',
    CHANGELIST: 'microchip.svg'
  },
  OBJECT_COLORS: {
    PERSON: 'rgba(0,183,214,0.5)',
    BUG: 'rgba(245,118,0,0.5)',
    IDEA: 'rgba(150,29,160,0.2)',
    TECHIDEA: 'rgba(150,29,160,0.2)',
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
    CHANGELIST: 'title'
  },
  OBJECT_RADIUS: {
    PERSON: 35,
    IDEA: 35,
    TECHIDEA: 35,
    BUILD: 25,
    BUILDCOMPONENT: 15,
    CHANGELIST: 15,
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
    }
  }
};