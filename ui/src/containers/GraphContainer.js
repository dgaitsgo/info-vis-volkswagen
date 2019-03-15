import React, { Component } from 'react'
import Graph from '../components/force-graph/Graph'
import { NavLink } from 'react-router-dom'
import { Heading } from "react-bulma-components/full"
import '../style/graph.css'

class GraphContainer extends Component{

    componentDidMount () {
        window.scrollTo(0, 0)
    }

    render(){
        return(
            <div className="graph-wrapper">
                <NavLink to='/explore'>
					<Heading size={1} className='graph-title'>
						Explore the Possibilities
					</Heading>
                </NavLink>
                    <p className='graph-paragraph'>
                        Pick your favorite models of a brand, customize and compare their emissions data.
                        Click on the title to start your journey.
                    </p>
                <Graph />
            </div>
        )
    }
}

export default GraphContainer
