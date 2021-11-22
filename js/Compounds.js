AFRAME.registerComponent("atoms", {
  
  init: async function(){
    var compounds=await this.getCompounds()
    var barcodes=Object.keys(compounds)
    barcodes.map((barcode)=>{
        var element=compounds[barcode]
        this.createAtoms(element)
        var elementName=element.element_name
        var barcodeValue=element.barcode_value
        var noOfElectrons=element.no_of_electrons
        var colours=await this.getElementColours()
        var scene=document.querySelector('a-scene')
        var marker=document.createElement('a-marker')
        marker.setAttribute('id','marker-${barcodeValue}')
        marker.setAttribute('type','barcode')
        marker.setAttribute('element_name',elementName)
        marker.setAttribute('value',barcodeValue)
        scene.appendChild(marker)

        var atom=document.createElement('a-entity')
        atom.setAttribute('id','${elementName}-${barcodeValue')
        marker.appendChild(marker)
        var card=document.createElement('a-entity')
        card.setAttribute('id','card-${elementName}')
        card.setAttribute('geometry',{
            primitive:'plane',
            width:1,
            height:1
        })
        card.setAttribute('material',{
            src:`./assets/atom_cards/card_${elementName}.png`
        })
        card.setAttribute('position',{x:0,y:0,z:0})
        card.setAttribute('rotation',{x:-90,y:0,z:0})
        atom.appendChild(card)
        var nucleusRadius=0.2
        var nucleus=document.createElement('a-entity')
        nucleus.setAttribute('id',`nucleus-${elementName}`)
        nucleus.setAttribute('geometry',{
          primitive:'sphere',
          radius:nucleusRadius
        })
        nucleus.setAttribute('material','color',colours[elementName])
        nucleus.setAttribute('position',{x:0,y:0,z:1})
        nucleus.setAttribute('rotation',{x:0,y:0,z:0})
        
        var nucleusName=document.createElement('a-entity')
        nucleusName.setAttribute('id',`nucleusName-${elementName}`)
        nucleusName.setAttribute('position',{x:0,y:0.21,z:-0.06})
        nucleusName.setAttribute('rotation',{x:-90,y:0,z:0})
        nucleusName.setAttribute('text',{font:'monoid',width:3,color:'black',align:'center',value:elementName})
        nucleus.appendChild(nucleusName)
        atom.appendChild(nucleus)
    })
    //this.getElementColours()
        
  },
  getCompounds:async function(){
    return fetch('../js/compoundList.json').then((response)=>{
        response.json()
        // console.log(r)
    }).then(data=>{
        console.log(data)
    })
    
  },
  getElementColours: async function(){
    return fetch('../js/elementColors.json').then(response=>{
        var color=response.json()
        // console.log(color)
    })
  },
  createAtoms:async function(element){
    
  }
  
  
  
});
