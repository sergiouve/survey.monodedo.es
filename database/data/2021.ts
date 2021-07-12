const data = {
  "survey": {
    "name": "2021"
  },
  "questions": {
    "personal": [
      {
        "text": "q_birthdate",
        "type": "OPEN",
        "required": true
      },
      {
        "text": "q_sex",
        "type": "OPEN",
        "required": true
      }
    ],
    "training": [
      {
        "text": "q_days_of_training_per_week",
        "type": "SINGLE",
        "required": true
      },
      {
        "text": "q_trains_at_home",
        "type": "SINGLE",
        "required": false
      }
    ],
    "outside": [
      {
        "text": "q_days_of_outside_climbing_per_week",
        "type": "SINGLE",
        "required": true
      }
    ],
    "social": [
      {
        "text": "q_started_alone_or_with_friends",
        "type": "SINGLE",
        "required": true
      }
    ],
    "gear": [
      {
        "text": "q_gear_sharing",
        "type": "SINGLE",
        "required": true
      }
    ]
  }
}

export default data
