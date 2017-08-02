import React from 'react'

export const Profile = (props) => {
  return (
    <div className='container'>
      <div className='col-md-6 col-md-offset-3'>
        <div className='row' style={{textAlign: 'center', marginBottom: '35px'}}>
          <h2>{props.profile.name}</h2>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Medi Token</div>
          <div className='col-xs-6'>{props.balance} MED</div>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Age</div>
          <div className='col-xs-6'>{new Date().getFullYear() - props.profile.birthY}</div>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Sex</div>
          <div className='col-xs-6'>{props.profile.isFemale ? 'Female' : 'Male'}</div>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Birthday</div>
          <div className='col-xs-6'>
            {props.profile.birthY} / {props.profile.birthM} / {props.profile.birthD}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Height</div>
          <div className='col-xs-6'>{props.profile.height/10.} cm</div>
        </div>
        <div className='row'>
          <div className='col-xs-6' style={{textAlign: 'right'}}>Weight</div>
          <div className='col-xs-6'>{props.profile.weight} kg</div>
        </div>
      </div>
    </div>
  )
}
