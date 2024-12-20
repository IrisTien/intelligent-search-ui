export const APP = {
  BASE_IMAGE_PATH: '../../../assets/images/',
  NEO4J: {
    USER: 'neo4j',
    PASSWORD: 'ca$hc0w', // 'test',
    URL: 'bolt://10.117.163.70:7687', // 'bolt://10.117.43.215:7687',
    GET_QUERY_URL: 'http://10.117.42.30:5000/'
  },
  ZOOMCHARTS: {
    LICENSE: 'ZCS-zd86p98sn: ZoomCharts SDK 30 day Free Trial License for Iri..@..3.com (valid for testing only); upgrades until: 2019-10-05',
    LICENSE_KEY: "034cbe58c228be8c4379f631cafc0f2905fadddf801d8dc89c"+
    "78e45a24537f5624e7c76a5c7c5d643e317c929c831d0e215391cb5310e93961fab2ef24fde85"+
    "92ca902ad9b9df31d54ce5e1e906b657c0e2d23e9984d499f0ea577481dacd2ca702b58fb0a31"+
    "b63658b71ec54b745c242b5ed666add3ae7343945649d1c15ae6273bec4a29234cf76e931f22c"+
    "46dd920e6334d79697e043efcde804c97a3e81747ef905f65760ab423dbb7bdf98b9876e41458"+
    "3e6ecfe530e72381c4b8e7a27f6a95ce0590d6c9bd75fe1729584b94ce2732c305f78df341750"+
    "47bef3efaf7fdb4d1e231b9ae000a59741c35ac205462dccfc13faa64f84e5f95c5130381b62b"
  },
  QUERY: {
    TECHFAIR_IDEA: '2019 TechFair Ideas',
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
    BUG: 'rgba(1,87,85,0.7)',
    IDEA: 'rgba(1,110,26,0.7)',
    TECHIDEA: 'rgba(1,110,26,0.7)',
    BUILD: 'rgba(1,145,64,0.8)',
    BUILDCOMPONENT: 'rgba(0,131,196,0.8)',
    CHANGELIST: 'rgba(204,86,2,0.8)',
    DPM: 'rgba(4,64,51,0.8)',
    CUSTOMER: 'rgba(77,5,1,0.8)',
    CONFLUENCE: 'rgba(3,28,168,0.8)',
    FEATURECOMPONENT: 'rgba(0,105,150,0.8)'
  },
  OBJECT_LABELS: {
    PERSON: 'shortName',
    BUG: 'bugID',
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
  },
  MODE: {
    DYNAMIC: 'dynamic',
    RADIAL: 'radial'
  }
};