import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation-delete-product.component.html',
  styleUrls: ['./confirmation-delete-product.component.css']
})
export class ConfirmationDeleteProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { clothes: Clothes | null },
              @Optional() public dialogConfirmationDelete: MatDialogRef<ConfirmationDeleteProductComponent>,
              public dialog: MatDialog,
              public clothesService: ClothesService,) { }

  ngOnInit(): void {
  }
  getClotheFullName(): string {
    if (this.data.clothes) {
      return this.data.clothes.title
    } else {
      return "this car";
    }
  }

  closeDialogConfirmationDelete(){
    this.dialogConfirmationDelete.close()
  }

  onSubmit() {
    if (this.data.clothes) {
      this.clothesService.deleteClothe(this.data.clothes.id).subscribe(() => {
        this.dialog.closeAll();
      })
    } else {
      this.dialogConfirmationDelete.close()
    }
  }
}
