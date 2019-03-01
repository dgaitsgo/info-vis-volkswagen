import React, { Component } from 'react'
import Graph from '../components/force-graph/Graph'
import { NavLink } from 'react-router-dom'
import { Heading } from "react-bulma-components/full"
import '../style/graph.css'

class GraphContainer extends Component{
    render(){
        return(
            <div className="graph-wrapper">
            <NavLink to='/explore'>
				<Heading size={1} className='graph-title'>
					Explore the Possibilities
				</Heading>
			</NavLink>
             <Graph />
             </div>
        )
        
    }
}
export default GraphContainer