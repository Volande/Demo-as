import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation-delete-product.component.html',
  styleUrls: ['./confirmation-delete-product.component.css']
})
export class ConfirmationDeleteProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { clothes: Clothes | null },
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

  onSubmit() {
    if (this.data.clothes) {
      this.clothesService.deleteClothe(this.data.clothes.id).subscribe(() => {
        this.dialog.closeAll();
      })
    } else {
      this.dialog.closeAll();
    }
  }
}
