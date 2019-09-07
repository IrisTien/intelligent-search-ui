import { Component, OnInit } from '@angular/core';
import * as ZoomChart from '@dvsl/zoomcharts';
import { APP } from 'src/app/common/app.constant';
import { Neo4jService } from 'src/app/common/neo4j.service';
import { WindowRef } from 'src/app/window-ref';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forEach, isNumber } from 'lodash';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  noData = true;
  loading = false;
  tooltipData = [];
  private zoomChart: any = ZoomChart;

  constructor(
    private neo4jService: Neo4jService,
    private winRef: WindowRef,
    private graphService: GraphService
  ) {
    winRef.nativeWindow.ZoomChartsLicense = 'ZCS-zd86p98sn: ZoomCharts SDK 30 day Free Trial License for Iri..@..3.com (valid for testing only); upgrades until: 2019-10-05';
    winRef.nativeWindow.ZoomChartsLicenseKey = "034cbe58c228be8c4379f631cafc0f2905fadddf801d8dc89c"+
      "78e45a24537f5624e7c76a5c7c5d643e317c929c831d0e215391cb5310e93961fab2ef24fde85"+
      "92ca902ad9b9df31d54ce5e1e906b657c0e2d23e9984d499f0ea577481dacd2ca702b58fb0a31"+
      "b63658b71ec54b745c242b5ed666add3ae7343945649d1c15ae6273bec4a29234cf76e931f22c"+
      "46dd920e6334d79697e043efcde804c97a3e81747ef905f65760ab423dbb7bdf98b9876e41458"+
      "3e6ecfe530e72381c4b8e7a27f6a95ce0590d6c9bd75fe1729584b94ce2732c305f78df341750"+
      "47bef3efaf7fdb4d1e231b9ae000a59741c35ac205462dccfc13faa64f84e5f95c5130381b62b";;
  }

  ngOnInit() {}

  /**
   *
   * @param nodesArr
   * @param relationShips
   * [
   *   {
   *     from: 0,
   *     to: 1,
   *     relationship: 'assignee of'
   *   }
   * ]
   *
   */
  processCommonData(nodesArr, relationShips) {
    const _data = { nodes: [], links: []};
    nodesArr.forEach(nodeGroup => {
      relationShips.forEach(relation => {
        const _link: any = {};
        _link.id = `${nodeGroup[relation.from].identity}-${nodeGroup[relation.to].identity}`
        _link.from = nodeGroup[relation.from].identity.toString();
        _link.to = nodeGroup[relation.to].identity.toString();
        _link.style = {};
        _link.style.label = relation.relationship;
        // _link.style.length = 5;

        _data.links.push(_link);
      });

      nodeGroup.forEach(node => {
        const _node: any = {};
        _node.id = node.identity.toString();
        _node.label = node.labels[0];
        _node.style = {};
        _node.extra = [];

        forEach(node.properties || {}, (value, key) => {
          const _item: any = {};
          _item.label = key;
          _item.content = value;
          _node.extra.push(_item);
        });

        if (node.labels && node.labels.length && APP.OBJECT_IMAGES[node.labels[0].toUpperCase()]) {
          const _nodeType = node.labels[0].toUpperCase();
          if (node.properties && node.properties.imageURL) {
            _node.style.image = node.properties.imageURL;
          } else {
            const _imageFile = APP.OBJECT_IMAGES[_nodeType];
            if (_imageFile) {
              _node.style.image = APP.BASE_IMAGE_PATH + _imageFile;
            }
          }

          if (APP.OBJECT_RADIUS[_nodeType]) {
            const _radiusObj = APP.OBJECT_RADIUS[_nodeType];
            if (isNumber(_radiusObj)) {
              _node.style.radius = _radiusObj;
            } else if (_radiusObj) {
              const _fieldValue = node.properties[_radiusObj.field];
              const _radius = _radiusObj.radius[_fieldValue];
              _node.style.radius = _radius;
            }
          }

          if (APP.OBJECT_COLORS[_nodeType]) {
            _node.style.fillColor = APP.OBJECT_COLORS[_nodeType];
          }

          if (APP.OBJECT_LABELS[_nodeType]) {
            _node.style.label = node.properties && node.properties[APP.OBJECT_LABELS[_nodeType]];
          }
        }

        _data.nodes.push(_node);
      });
    });
    return _data;
  }

  // processBugAndAssignee(nodesArr) {
  //   const _data = { nodes: [], links: []};
  //   nodesArr.forEach(nodeGroup => {
  //     const _link: any = {};
  //     _link.id = `${nodeGroup[0].identity}-${nodeGroup[1].identity}`;
  //     _link.label = 'is assignee of';
  //     _link.from = nodeGroup[0].identity.toString();
  //     _link.to = nodeGroup[1].identity.toString();

  //     _data.links.push(_link);

  //     nodeGroup.forEach(node => {
  //       const _node: any = {};
  //       _node.id = node.identity.toString();
  //       _node.label = node.labels[0];
  //       _node.style = {};
  //       if (node.labels[0] === 'Person') {
  //         _node.style.image = APP.BASE_IMAGE_PATH + 'user-solid.svg';
  //       } else if (node.labels[0] === 'Bug') {
  //         _node.style.image = APP.BASE_IMAGE_PATH + 'bug-solid.svg';
  //       }

  //       _data.nodes.push(_node);
  //     });
  //   });
  //   return _data;
  // }

  genChart(data?) {
    const infoElement: any = document.getElementById("tooltip");

    const chartContainer = document.getElementById("chart");
    disposeDemo();

    var t = new this.zoomChart.NetChart({
      container: chartContainer,
      area: { height: 550, width: this.getWidth() - 240 },
      layout: {
        groupSpacing: 50
      },
      data: [{
        preloaded: data
      }],
      // data: [{
      //   url: '/assets/data.json'
      // }],
      // data: [{
      //   preloaded: {
      //     nodes: [
      //       {
      //         id: "foo",
      //         loaded: false
      //       },
      //       { id: "bar", loaded: true },
      //       { id: "baz", loaded: true }
      //     ],
      //     links: [
      //       { id: "foo-bar", from: "foo", to: "bar" },
      //       { id: "bar-baz", from: "bar", to: "baz" },
      //       { id: "baz-foo", from: "baz", to: "foo" }
      //     ]
      //   }
      // }],
      style:{
        node: {
          labelStyle: {
            scaleWithSize: false,
            textStyle: {
              font: '8px Metropolis,"Avenir Next","Helvetica Neue",Arial,sans-serif'
            }
          }
        },
        nodeLabel: {
          textStyle: {
            font: '10px Metropolis,"Avenir Next","Helvetica Neue",Arial,sans-serif'
          }
        },
        nodeDetailMinSize: 10,
        // nodeDetailMinZoom: 1,
        linkLabel: {
          rotateWithLink: true,
          textStyle: {
            font: '8px Metropolis,"Avenir Next","Helvetica Neue",Arial,sans-serif'
          }
          // scaleWithSize: true,
          // scaleWithZoom: false
        },
        // linkLabelScaleBase: 0.5,
        linkLengthExtent: [2.1, 150],
        nodeStyleFunction: this.nodeStyleHandler,
        linkStyleFunction: this.linkStyleHandler
      },
      // navigation:{mode:"focusnodes"},
      // interaction: { selection: { lockNodesOnMove: false } }
      interaction: {
        selection: {
            lockNodesOnMove: false
        },
        zooming: {
            autoZoomExtent: [0.5, 4]
        }
      },
      events: {
        onHoverChange: (event, args) => {
            var content = "";
            // fill the info popup based on the node that was hovered.
            if (args.hoverItem) {
                content = "Item hovered";
            } else if (args.hoverNode) {
              this.tooltipData = args.hoverNode.data && args.hoverNode.data.extra;
                content = "Node hovered";
            } else if (args.hoverLink) {
                content = "Link hovered";
            }

            const infoElementVisible = !!content;
            infoElement.style.display = infoElementVisible ? "block" : "none";
        },
        onClick: (event, args) => {
          if (args.hoverNode) {
            const _extraData = args.hoverNode.data && args.hoverNode.data.extra;
            const _link = _extraData.find(item => item.label === 'link');
            if (_link) {
              window.open(_link.content, "_blank");
            }
          }
        }
      }
    });

    function movePopup(event) {
      infoElement.style.top = event.pageY + "px";
      infoElement.style.left = event.pageX + "px";
    }

    // attach event handlers that move the info element with the mouse cursor.
    chartContainer.addEventListener("mousemove", movePopup, true);
    chartContainer.addEventListener("pointermove", movePopup, true);

    // function should be called whenever the chart is removed
    function disposeDemo() {

      chartContainer.removeEventListener("mousemove", movePopup);
      chartContainer.removeEventListener("pointermove", movePopup);

      // remove the menu element that was created dynamically
      if (infoElement) {
        infoElement.style.display = "none";
      }
    }
  }

  query(text) {
    this.loading = true;
    this.clearChart();

    // const _orgRelation = this.graphService.generateRelationships(APP.QUERY.ORG);
    const _relation = this.graphService.generateRelationships(text);

    // let _orgData;
    // this.neo4jService.query(APP.QUERY.ORG)
    // .then(resp => {
    //   _orgData = this.processCommonData(resp, _orgRelation);
    //   return this.neo4jService.query(text);
    // })
    this.neo4jService.query(text)
    .then(resp => {
      const _processedData = this.processCommonData(resp, _relation);
      // const _mergedData = {
      //   nodes: [..._orgData.nodes, ..._processedData.nodes],
      //   links: [..._orgData.links, ..._processedData.links]
      // }
      this.genChart(_processedData);
      this.noData = false;
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
    });
  }

  nodeStyleHandler(node) {
    if (node.data.label === 'Person') {
      // node.display = 'text';
      node.imageCropping = 'crop';
      // node.imageSlicing = [0,0,64,64];
    }
    // if (node.data.type === 'person') {
      // node.className = 'icon-class';
      // node.id = node.data.identity;
      // node.label = node.data.labels[0];
    // }
    // if(!node.data.fillColor) {
    //   var color = sliceColors[Math.floor(Math.random()*sliceColors.length)];

    //   node.fillColor = node.data.fillColor = color;
    //   node.lineColor = node.data.lineColor =color.replace(",1)",",0.5)");
    //   node.lineWidth = node.data.lineWidth = 8;
    // } else {
    //   node.fillColor = node.data.fillColor;
    //   node.lineColor = node.data.lineColor;
    //   node.lineWidth = node.data.lineWidth;
    // }
  }

  linkStyleHandler(link) {
    // link.fromDecoration = "circle";
    link.toDecoration = "arrow";
    link.radius = 3;
    link.fillColor = '#ccc';
    // link.fillColor = 'rgba(236,46,46,1)';
  }

  clearChart() {
    const chartContainer = document.getElementById("chart");
    while(chartContainer.children && chartContainer.children.length) {
      chartContainer.children[0].remove();
    }
  }

  private getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

}
