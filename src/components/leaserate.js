import React from 'react'
import { Card } from 'react-bootstrap'

export default function leaserate({ greaterRegion, market, position, region }) {

  return (
    <div>
   
    <Card
      border="primary"
      className={` p-2`}
      style={{ height: '100%' }}
    >
      <Card.Body>
        <Card.Title >{greaterRegion}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <div >
            {market + ' ' + region}
          </div>
        </Card.Subtitle>
        <Card.Text >
          {position}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}
