# Welcome to Bimbo Skyline
QA Assurance software @ Bimbo Group factories

##Intro
Hi there, welcome to Bimbo's Skyline repo.  
Good to have you here. :)

Some info that might be useful:

- Users have 3 access levels (Master, Admin, Employee).
  - Master Users have access to everything, all factory data and global dashboard
  - Admin Uses are the ones that have access only to one factory data
  - Employee are the ones who do the QA from the App, they don't even have
    access to the website  
  _Note: There is a small mess on this. The frontend is using Admin, Manager
         and Scorer instead of the above and components sometimes use Users
         for Scorer. (I know, I know my bad. This should be fixed eventually tho)_


## Todo
[ ] Consolidate user naming from Master, Admin and Employee to Admin, Manager, Scorer.  
[ ] Frontend i18n change the name from Poly to i18n. On the export and every instance
    on the App. (I know, it'll be a mess; Not looking forward to it)

## Additonal Notes

- Most components are using things like factorySlug coming from the props or react
  router params. Should look into setting them in the components itself (this.name)
  on the constructor and using that one everywhere instead of creating a new variable
  on each function.
