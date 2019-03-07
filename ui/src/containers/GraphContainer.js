import React, { Component } from 'react'
import Graph from '../components/force-graph/Graph'
import { NavLink } from 'react-router-dom'
import { Heading } from "react-bulma-components/full"
import '../style/graph.css'

class GraphContainer extends Component{
    render(){
        return(
            <div className="graph-wrapper">
                <p className='graph-paragraph'>Find your own dream car, and explor our volkwegan family.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
