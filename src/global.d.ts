// Define the valid status values
declare type UserStatusType = 'Working' | 'OnVacation' | 'LunchTime' | 'BusinessTrip';

// Define the User interface
declare type UserType = {
  id: number;
  name: string;
  status: UserStatusType;
  img: string;
}
