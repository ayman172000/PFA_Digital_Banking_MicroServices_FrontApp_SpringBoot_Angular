import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {CreditsComponent} from "./credits/credits.component";
import {OperationsComponent} from "./operations/operations.component";
import {PredictComponent} from "./predict/predict.component";
import {AuthGuard} from "./guards/sercurity.guard";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"clients",component:ClientComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"refreshClient",component:ClientComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"comptes",component:ComptesComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"refreshAccount",component:ComptesComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"comptes/client/:id",component:ComptesComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"credits",component:CreditsComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"refreshOperation",component:OperationsComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"operations/compte/:id",component:OperationsComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
  {path:"predict",component:PredictComponent,canActivate : [AuthGuard], data : { roles : ['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
