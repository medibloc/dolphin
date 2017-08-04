import React from 'react'

export const Histories = (props) => {
  return (
    <div className='container'>
      <div className='col-md-6 col-md-offset-3'>
        {props.histories.map((h, i) =>
          <History key={i} history={h} />
        )}
      </div>
    </div>
  )
}

export const History = (props) => {
  return (
    <div className='row'>
      <div className='col-xs-6'>
        Disease: {props.history.disease}
      </div>
      <div className='col-xs-6'>
        Prescription: {props.history.prescription}
      </div>
    </div>
  )
}
