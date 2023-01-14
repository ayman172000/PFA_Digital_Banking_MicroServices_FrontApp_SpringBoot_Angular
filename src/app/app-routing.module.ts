import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {CreditsComponent} from "./credits/credits.component";
import {OperationsComponent} from "./operations/operations.component";
import {PredictComponent} from "./predict/predict.component";

const routes: Routes = [
  {path:"clients",component:ClientComponent},
  {path:"refreshClient",component:ClientComponent},
  {path:"comptes",component:ComptesComponent},
  {path:"refreshAccount",component:ComptesComponent},
  {path:"comptes/client/:id",component:ComptesComponent},
  {path:"credits",component:CreditsComponent},
  {path:"refreshOperation",component:OperationsComponent},
  {path:"operations/compte/:id",component:OperationsComponent},
  {path:"predict",component:PredictComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
