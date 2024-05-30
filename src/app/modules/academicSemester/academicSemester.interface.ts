export type TNames = 'Autumn' | 'Summer' | 'Fall'
export type TCodes = '01' | '02' | '03'
export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

type TAcademicSemester = {
  name: TNames
  year: string
  code: TCodes
  startMonth: TMonths
  endMonth: TMonths
}

export default TAcademicSemester
