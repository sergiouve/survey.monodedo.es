import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateSurveysSurveysTable extends BaseSchema {
  protected tableName = 'surveys_surveys'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.boolean('is_active')
      table.timestamp('starts_at')
      table.timestamp('ends_at')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
