import jsplumb from 'jsplumb'
  //This means only one caller,otherwise it will be conflict
  let jp = undefined

export default function initJsPlumb(treeNodes) {

  //
  initInstance()
  
  initNodes()
  //

  function initNodes() {
    if(!treeNodes){
      return
    }
    for (const node of treeNodes) {
      //
      const nodeId = 'pn_' + node.entity.key

      //Source end point
      if (node.children.length > 0) {
        jp.addEndpoint(nodeId, {
          anchors: ['Right'],
          endpoint: [
            'Dot',
            {
              radius: 1
            }
          ],
          isSource: true,
          isTarget: false,
          uuid: node.entity.key + '_source'
        })
      }
      //Target end point
      if (node.parent) {
        jp.addEndpoint(nodeId, {
          anchors: ['Left'],
          endpoint: [
            'Dot',
            {
              radius: 1
            }
          ],
          isSource: false,
          isTarget: true,

          uuid: node.entity.key + '_target'
        })
      }
      //Connection
      if (node.relation) {
        jp.connect({
          uuids: [node.relation.source + '_source', node.relation.target + '_target']
        })
        //   .getOverlay('label')
        //   .setLabel(node.relation.joinType)
      }
    }

  }

  function initInstance() {
    if (jp) {
      jp.reset()
    }
    jsPlumb.ready(function () {
      jp = jsPlumb.getInstance({
        Connector: ['Straight'],
        ConnectionOverlays: [
          ['Arrow', { width: 8, length: 8, location:1, id: 'arrow' }],
          // ['Label', { label: '●', location: 0.5, id: 'label', cssClass: "entityTreeLabel", }]
        ],
        ConnectionsDetachable: false,
        MaxConnections: -1,

        Container: 'entityTreePanel',
        EndpointStyle: { fill: '#999999' },
        EndpointHoverStyle: { fill: '#777777' },
        PaintStyle: {
          stroke: '#777777',
          strokeWidth: 2,
          dashstyle: '1 1',
          //  gradient: { stops: [[0, "green"], [1, "blue"]] }
        } 
      })
      
    })
  }
}
