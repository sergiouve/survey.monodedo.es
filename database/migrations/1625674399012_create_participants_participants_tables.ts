import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateParticipantsParticipantsTables extends BaseSchema {
  protected tableName = 'participants_participants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('survey_sesssion_id')
      table.string('email')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
