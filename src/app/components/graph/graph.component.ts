import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as ZoomChart from '@dvsl/zoomcharts';
import { APP } from 'src/app/common/app.constant';
import { Neo4jService } from 'src/app/common/neo4j.service';
import { WindowRef } from 'src/app/window-ref';
import { forEach, isNumber, isArray } from 'lodash';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Output()
  onSearchTextChange = new EventEmitter();

  noData = true;
  loading = false;
  showError = false;
  tooltipData = [];
  gridDataObj = {};
  gridKeys = [];
  chartMode = APP.MODE.DYNAMIC;
  nodeLegends = [];
  private zoomChart: any = ZoomChart;
  private processedChartData = {};

  constructor(
    private neo4jService: Neo4jService,
    private winRef: WindowRef,
    private graphService: GraphService
  ) {
    winRef.nativeWindow.ZoomChartsLicense = APP.ZOOMCHARTS.LICENSE;
    winRef.nativeWindow.ZoomChartsLicenseKey = APP.ZOOMCHARTS.LICENSE_KEY;
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
  processCommonData(nodesArr, relationShips?) {
    const _data = { nodes: [], links: []};
    this.nodeLegends = [];
    nodesArr.forEach(nodeGroup => {
      // relationShips.forEach(relation => {
      //   const _link: any = {};
      //   _link.id = `${nodeGroup[relation.from].identity}-${nodeGroup[relation.to].identity}`
      //   _link.from = nodeGroup[relation.from].identity.toString();
      //   _link.to = nodeGroup[relation.to].identity.toString();
      //   _link.style = {};
      //   _link.style.label = relation.relationship;
      //   // _link.style.length = 5;

      //   _data.links.push(_link);
      // });

      nodeGroup.forEach(node => {
        if (isArray(node)) {
          const _relationArr = node;
          _relationArr.forEach(_relation => {
            const _link: any = {};
            _link.style = {};
            _link.style.label = APP.RELATIONSHIP_MAP[_relation.type];
            _link.from = _relation.start.low.toString();
            _link.to = _relation.end.low.toString();
            _link.id = `${_link.from}-${_link.to}`;

            _data.links.push(_link);
          });
        } else if (node.type) {
          // It is relationship array
          const _relation = node;
          const _link: any = {};
          _link.style = {};
          _link.style.label = APP.RELATIONSHIP_MAP[_relation.type];
          _link.from = _relation.start.toString();
          _link.to = _relation.end.toString();
          _link.id = `${_link.from}-${_link.to}`;

          _data.links.push(_link);
        } else {
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

            if (!this.nodeLegends.find(item => item.className === node.labels[0])) {
              this.nodeLegends.push({
                className: node.labels[0],
                style: {
                  image: APP.BASE_IMAGE_PATH + APP.OBJECT_IMAGES[_nodeType]
                }
              });
            }

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
        }
      });
    });
    return _data;
  }

  genChart(data?, mode?) {
    const infoElement: any = document.getElementById("tooltip");

    const chartContainer = document.getElementById("chart");
    disposeDemo();

    var t = new this.zoomChart.NetChart({
      container: chartContainer,
      area: { height: this.getHeight(), width: this.getWidth() },
      layout: {
        // groupSpacing: 50
        mode: mode ? mode : APP.MODE.DYNAMIC
      },
      legend: { enabled: true },
      data: [{
        preloaded: data
      }],
      style:{
        // nodeClasses: this.nodeLegends,
        node: {
          labelStyle: {
            // scaleWithSize: false,
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
        // nodeDetailMinSize: 10,
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
        // linkLengthExtent: [0.5, 150],
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
          // autoZoomExtent: [0.1, 4]
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
            if (args.hoverNode.data.label === 'Person') {
              // Search neo4j for this person
              const _personName = args.hoverNode.label;
              this.onSearchTextChange.emit(_personName);
              this.query(_personName);
            } else if (args.hoverNode.data.label === 'Bug') {
              const _bugQueryText = `Bug ${args.hoverNode.label}`;
              this.onSearchTextChange.emit(_bugQueryText);
              this.query(_bugQueryText);
            } else {
              const _extraData = args.hoverNode.data && args.hoverNode.data.extra;
              const _link = _extraData.find(item => item.label === 'link');
              if (_link) {
                window.open(_link.content, "_blank");
              }
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

  openLink(link) {
    window.open(link, "_blank");
  }

  query(text) {
    this.loading = true;
    this.showError = false;
    this.clearChart();

    const _trimedText = text.trim();
    if (_trimedText.toUpperCase().indexOf('MATCH') === 0) {
      this.doNeo4jQuery(text);
    } else {
      this.neo4jService.findQueryString(text)
      .subscribe(queryString => {
        this.doNeo4jQuery(queryString);
      }, error => {
        const _query = error.error.text;
        if (_query && _query.toUpperCase() !== 'ERROR') {
          this.doNeo4jQuery(_query);
        } else {
          this.doErrorHandling();
        }
      })
    }
  }

  onModeChange(mode) {
    this.clearChart();
    this.genChart(this.processedChartData, mode);
  }

  doErrorHandling() {
    this.showError = true;
    this.loading = false;
    this.noData = false;
  }

  doNeo4jQuery(text) {
    this.neo4jService.query(text)
    .then(resp => {
      this.processedChartData = this.processCommonData(resp);
      this.genChart(this.processedChartData, this.chartMode);
      this.processGridData(resp);
      this.noData = false;
      this.loading = false;
    })
    .catch(err => {
      this.doErrorHandling();
    });
  }

  processGridData(resp) {
    this.gridDataObj = {};
    this.gridDataObj = this.graphService.generateGridData(resp);
    this.gridKeys = Object.keys(this.gridDataObj || {});
  }

  nodeStyleHandler(node) {
    // if (node.data.label === 'Person' || node.data.label === 'Customer' ||
      // node.data.label === 'Bug') {
      // node.display = 'text';
      node.imageCropping = 'crop';
      // node.imageSlicing = [0,0,64,64];
    // }
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
    ) - 240;
  }

  private getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    ) - 216;
  }

}
