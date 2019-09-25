import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators'
// import * as decodeFirebasePushID from '@jengjeng/firebase-pushid-convert-timestamp';
// import * as Chance from 'chance';
// import * as moment from 'moment';
import * as _ from 'lodash';

import { SharedService } from './shared.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {

  productList: AngularFireList<any>;
  posData: AngularFireList<any>;


  constructor(
    private db: AngularFireDatabase,
    private shared: SharedService
  ) {
    this.productList = db.list<any>('product-list');
    this.posData = db.list<any>('pos-data');
  }
  
  // updateAllUID() {
  //   this.productList.snapshotChanges().pipe(
  //     map((value) => {
  //       return value.map((db) => {
  //         const oldData = db.payload.toJSON();
  //         let data = db.payload.toJSON();
  //
  //         data['uid'] = db.key;
  //         db.payload.ref.update(data).then(() => {
  //           console.log(`old > ${oldData['uid']}`, `new > ${data['uid']}`);
  //         })
  //       })
  //     })
  //   ).subscribe(() => 0);
  // }
  
  currentUser(uid: string) {
    return this.db.list<any>('users').snapshotChanges().pipe(
      map((cloud) => {
        return cloud.map((data) => {
          const ref = data.payload;
          
          if (ref.key === uid) {
            
          }
          
        })
      })
    )
  }
  
  createNewUser(path: string, data: any) {
    return this.db.list<any>(path).push(data);
  }

  addNewBeverage(path: string, beverage: any) {
    
    const obs = this.getList(0, path).pipe(
      map((values: any) => {
        return values.reduce((accumulator: any, current: any) => {
          const curr = Number(current['code']);
          if (curr > accumulator) { accumulator = curr; }
          return accumulator;
        }, 0) + 1;
      })
    ).subscribe((code) => {
      
      obs.unsubscribe();
      
      const product = {
        amount: 0, beginning: 0, delivery: 0, ending: 0,sold: 0, total: 0, waste: 0, code,
        beverageGroup: beverage.beverageGroup,
        beverageName: `${beverage.beverageGroup} ${beverage.beverageName}`,
        sellingPrice: Number(beverage.sellingPrice).toFixed(2).toString(),
      }
      
      const shortProduct = { item: `${code} ${beverage.beverageShortName}` };
      
      this.db.list<any>(path).push(product).then(() => {
        this.shared.openSnack({
          message: `Succssfully added "${beverage.beverageGroup} ${beverage.beverageName}" to list.`,
          duration: 3500,
          horizontal: 'center',
          vertical: 'bottom'
        })
      });
      
      const obs2 = this.getList(code).subscribe((res: any[]) => {
      
        obs2.unsubscribe();
        const doc = res.filter((a) => a.item.includes(code.toString()))[0]
        this.db.list<any>(this.newPath(code)).update(doc.uid, shortProduct);
      });
      
    });
  }

  updateBeverage(path: string, uid: string, beverage: any, code: number) {
    let count = 0;
    const obs = this.db.list<any>(path).snapshotChanges().pipe(
      map((values) => {
        return values.map((value) => {

          if (count !== 0) return;

          if (value.key === uid) {
            
            beverage['sellingPrice'] = Number(beverage['sellingPrice']).toFixed(2).toString()
            value.payload.ref.update(beverage).then(() => {
              this.shared.openSnack({
                message: `Succssfully updated "${beverage['beverageName']}".`,
                duration: 3500,
                horizontal: 'center',
                vertical: 'bottom'
              })
            });
            
            
            
            obs.unsubscribe();
            return count++;
          }
        })
      })
    ).subscribe(() => 0);
    
    const obs2 = this.getList(code).subscribe((res: any[]) => {
    
      obs2.unsubscribe();
      const doc = res.filter((a) => a.item.includes(code.toString()))[0];
      this.db.list<any>(this.newPath(code)).update(doc.uid, { item: `${code} ${beverage.beverageShortName}` });
    });
    
    const obs3 = this.db.list<any>(path).snapshotChanges().pipe(
      map((_values) => {
        _values.map(_value => {
    
          const _uid = _value.key;
          const _amount = _value.payload.toJSON()['sellingPrice'];
    
          if (_uid === uid) {
    
            const toSold = beverage.sold;
            let toAmount = ( _amount * parseInt(beverage.sold) );

            if (toSold < 0 || toAmount < 0) return;

            _value.payload.ref.update({
              sold: toSold,
              amount: toAmount
            });
    
            obs3.unsubscribe();
          }

        })
      }),
    ).subscribe(() => (0));
  }

  removeBeverage(path: string, data: any) {
    let count = 0;
    const obs = this.db.list<any>(path).snapshotChanges().pipe(
      map((values) => {
        return values.map((value) => {

          if (count !== 0) return;

          if (value.payload.toJSON()['beverageName'] === data['beverageName']) {
            
            value.payload.ref.remove().then(() => {
              this.shared.openSnack({
                message: `Succssfully removed "${data['beverageName']}" to list.`,
                duration: 3500,
                horizontal: 'center',
                vertical: 'bottom'
              })
            });
            obs.unsubscribe();
            return count++;
          }
        })
      })
    ).subscribe(() => (true));
    
    const obs2 = this.getList(data.code).subscribe((res: any[]) => {
    
      obs2.unsubscribe();
      const doc = res.filter((a) => a.item.includes(data.code.toString()))[0];
      this.db.list<any>(this.newPath(data.code)).update(doc.uid, { item: `${data.code}` });
      
    });
  }

  readProductList(path: string) {
    return this.db.list<any>(path).snapshotChanges().pipe(
      map((values) => {

        const array = values.map((value) => {
          const uid = value.payload.key;
          const data = value.payload.toJSON();
          return { uid, ...data };
        });

        const beverageGroup = _.sortBy(array, [data => data['beverageGroup']]);;
        return _.sortBy(beverageGroup, [data => data['beverageName']]);
      })
    );
  }
  
  compareToUpdate(beverage: any) {
    return this.db.list<any>('product-list').snapshotChanges().pipe(
      map((db) => {
        return db.map((fire) => {
          const data = fire.payload.toJSON();
          return { ...data };
        })
      }),
      map((doc) => {
        const beverageName = doc[0]['beverageName'] == beverage['beverageName'];
        const beverageShortName = doc[0]['beverageShortName'] == beverage['beverageShortName'];
        const sellingPrice = doc[0]['sellingPrice'] == beverage['sellingPrice'];
        const beginning = doc[0]['beginning'] == beverage['beginning'];
        const delivery = doc[0]['delivery'] == beverage['delivery'];
        const waste = doc[0]['waste'] == beverage['waste'];
        const total = doc[0]['total'] == beverage['total'];
        const ending = doc[0]['ending'] == beverage['ending'];
        const sold = doc[0]['sold'] == beverage['sold'];
        return beverageName && beverageShortName && sellingPrice && beginning && delivery && waste && total && ending && sold;
      })
    )
  }
  
  computeTransaction() {
    return this.readProductList('product-list').pipe(
      map((products: any[]) => {
        
        const transaction = products.reduce((acc: any, current: any) => {
          current.amount !== 0 ? acc.push(current) : 0;
          return acc;
        }, []);
        
        const total = products.reduce((acc: any, current: any) => acc + current.amount, 0);
        
        return { transaction, total };
      })
    );
  }
  
  removeAllTransaction() {
    return this.db.list<any>('product-list').snapshotChanges().pipe(
      map((values) => {
        return values.map((value) => {
          const data = value.payload.toJSON();
          delete data['amount'];
          delete data['sold'];
          data['amount'] = 0;
          data['sold'] = 0;
          value.payload.ref.update(data)
        });
      })
    ).subscribe(() => 0);
  }
  
  readPlRange(code: any) {
    return this.getList(code).pipe(
      map((res: any[]) => {
        return res.filter((a) => a.item.includes(code.toString()))[0];
      })
    )
  }

  parseMachineData() {

    this.db.list<any>('pos-data').snapshotChanges([ 'child_added' ]).pipe(
      map((values) => {

        values.slice(0, 1).map((value) => {
          this.db.list('pos-data').remove();
          if (value.type !== 'child_added') return;

          // let data = <any>value.payload.toJSON().toString().split('/');
          // data = { code: data[0], quantity: data[1], mode: data[2] }

          var data: any =  value.payload.toJSON();
          
          const observable = this.db.list<any>('new-pl').snapshotChanges().pipe(
            map((_values) => {
              _values.map(_value => {
          
                const condition = _value.payload.child('code').val().toString() === data.code;
                if (condition !== true) return;
          
                const _quantity = _value.payload.child('sold').val();
                const _old = _value.payload.child('amount').val();
                const _amount = _value.payload.child('sellingPrice').val();
          
                if (_quantity < 0 || _amount < 0) return;
          
                if (parseInt(data.mode) === 1 || data.mode === 'LOG') {
          
                  const toSold = _quantity + parseInt(data.quantity);
                  const toAmount = ( _amount * parseInt(data.quantity) ) + parseInt(_old);
                  if (toSold < 0 || toAmount < 0) return;
                
                  _value.payload.ref.update({
                    sold: toSold,
                    amount: toAmount
                  });
          
                  observable.unsubscribe();
                  this.db.list('pos-data').remove();
                  this.db.list('pos-data-history').push(data);
                  
                } else if (parseInt(data.mode) === 2 || data.mode === 'VOID') {
          
          
                  const toSold =  _quantity - parseInt(data.quantity);
                  const toAmount = _old - ( _amount * parseInt(data.quantity) );
                  if (toSold < 0 || toAmount < 0) return;
          
                  if (_quantity < 0) return;
                  _value.payload.ref.update({
                    sold: toSold,
                    amount: toAmount
                  });
          
                  observable.unsubscribe();
                  this.db.list('pos-data').remove();
                  this.db.list('pos-data-history').push(data);
                }

              })
            }),
          ).subscribe(() => (0));
        })
        
      })
    ).subscribe(() => (0));

  }

  test_manualPostData(value: any) {

    const posData = `${value.code}/${value.quantity}/${value.mode}`
    this.db.list<any>('pos-data').push(posData)
  }
  
  public pushThis(doc: any, name: string) {
    this.db.list<any>(name).push(doc);
  }
  
  private newPath(code: number) {
    const set1 = Number(code.toString().slice(0,2));
    return `pl-${set1}0-${set1}9`;
  }
  
  private getList(code: number = 0, path?: string) {
    
    const newPath = code === 0 ? path : this.newPath(code);
    return this.db.list<any>(newPath).snapshotChanges().pipe(
      map((values: any) => {
        return values.map((value: any) => {
          const uid = value.payload.key;
          const data = value.payload.toJSON();
          return { uid, ...data };
        });
      })
    )
  }

}

// transfer = [
//   "100 Big 250 Apple",
//   "101 Big 250 Grapes",
//   "102 Big 250 Mango",
//   "103 Big 250 Orange",
//   "104 Big 250 PApple",
//   "105 Blub EOC Mango",
//   "106 Blub EOC OrMgo",
//   "107 Blub EOC Stbry",
//   "108 Blub NestAGTea",
//   "109 Blub Nest BLem",
//   "110 Blub Nest BMel",
//   "111 Blub Nest CLem",
//   "112 Blub Nest LLch",
//   "113 Blub NestSRTea",
//   "114 Carbon Dioxide",
//   "115 Car dio Cardio",
//   "116 Cebri Cal 500",
//   "117 Cobra Berry350",
//   "118 Cobra Reg 350",
//   "119 Cobra Smart350",
//   "120 Coke Light 330",
//   "121 Coke Reg BIB",
//   "122 Coke Reg 330",
//   "123 Coke Zero 330",
//   "124 EOC Mango 175",
//   "125 EOC OrMgo 175",
//   "126 EOC Stbry 30",
//   "127 Ftn Coke Reg12",
//   "128 Ftn Coke Reg16",
//   "129 Ftn Coke Reg22",
//   "130 Ftn Coke Reg24",
//   "131 Ftn MM Apple12",
//   "132 Ftn MM Apple16",
//   "133 Ftn MM Apple22",
//   "134 Ftn MM Apple24",
//   "135 Ftn MM Ornge12",
//   "136 Ftn MM Ornge16",
//   "137 Ftn MM Ornge22",
//   "138 Ftn MM Ornge24",
//   "139 Ftn Ryl Orng12",
//   "140 Ftn Ryl Orng16",
//   "141 Ftn Ryl Orng22",
//   "142 Ftn Ryl Orng24",
//   "143 Ftn Sarsi 12",
//   "144 Ftn Sarsi 16",
//   "145 Ftn Sarsi 22",
//   "146 Ftn Sarsi 24",
//   "147 Ftn Sprite 12",
//   "148 Ftn Sprite 16",
//   "149 Ftn Sprite 22",
//   "150 Ftn Sprite 24",
//   "151 Gat Blue 500",
//   "152 Gat Grapes 500",
//   "153 Gat Frc GA 500",
//   "154 Gat Lime 500",
//   "155 Gat Orange 500",
//   "156 Gat PnkLem 500",
//   "157 Gat TropFrt500",
//   "158 Gat WhtLtng500",
//   "159 Lptn GrnTea450",
//   "160 Lptn LmnIT 450",
//   "161 Lptn RedIT 450",
//   "162 MM Apl BIB",
//   "163 MM 4Season 330",
//   "164 MM MgoOrng 330",
//   "165 MM Orange BIB",
//   "166 MM Orange 330",
//   "167 Mntn Dew 500",
//   "168 Mug RtBr 300",
//   "169 Nest Apple500",
//   "170 Nest AGTea360",
//   "171 Nest BLem 360",
//   "172 Nest BMel 360",
//   "173 Nest CLem 360",
//   "174 Nest Lem 500",
//   "175 Nest LemIT500",
//   "176 Nest LLem 360",
//   "177 Nest SRTea360",
//   "178 Oishi CChug",
//   "179 Oishi FFrtApl",
//   "180 Oishi FFrtGrp",
//   "181 Oishi FFrtPch",
//   "182 Oishi OtsMilk",
//   "183 Oishi RckRoad",
//   "184 1Pls AplCoolr",
//   "185 1Pls 4Season",
//   "186 1Pls RT Rsbry",
//   "187 1Plus Strbry",
//   "188 Paper Cups 12",
//   "189 Paper Cups 16",
//   "190 Paper Cups 22",
//   "191 Pepsi Maxx 500",
//   "192 Pepsi Reg 500",
//   "193 Pwrd Bry Ice",
//   "194 Pwrd MtnBlst",
//   "195 Pwrd Orange",
//   "196 RLf Frt Apl480",
//   "197 RLf Frt Cal480",
//   "198 RLf Frt Ice480",
//   "199 RLf Frt Lem480",
//   "200 RLf Frt Lch480",
//   "201 Ryl Grape 330",
//   "202 Royl Orng 330",
//   "203 Sarsi BIB",
//   "204 Sarsi 300",
//   "205 Seven Up 500",
//   "206 SmtC Cal 350",
//   "207 SmtC Cal 500",
//   "208 SmtC Dal 350",
//   "209 SmtC Dal 500",
//   "210 SmtC Lem 350",
//   "211 SmtC Lem 500",
//   "212 SmtC Ornge 350",
//   "213 SmtC Ornge 500",
//   "214 SmtC PomGrp350",
//   "215 SmtC PomGrp500",
//   "216 Sola LemIT 473",
//   "217 Sola PchApl473",
//   "218 Sola Rspbry473",
//   "219 Sola Strbry473",
//   "220 Soya",
//   "221 Sprite BIB",
//   "222 Sprite Reg 330",
//   "223 Sprite Sbry330",
//   "224 Summit MWtr350",
//   "225 Tzers BLem2L",
//   "226 Tzers GrnApl2L",
//   "227 Tzers RbryIT2L",
//   "228 Trop JPulp 335",
//   "229 Vmilk Choc 250",
//   "230 Vmilk Soy 250",
//   "231 Wkins Apl 425",
//   "232 Wkins Orng 425",
//   "233 Wkins Pom 425",
//   "234 Zesto Rootbeer",
//   "235 Zesto Slc Dal",
//   "236 Zesto Slc GrAp",
//   "237 Zesto Slc Mngo",
//   "238 Zesto Slc Orng",
// ]
