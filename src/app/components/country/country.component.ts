import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ICountry } from 'src/app/types/api';

const REGION_OPTIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  source!: ICountry[]
  // countries$!: Observable<ICountry[]>
  searchFilter?: string
  regionFilter?: string
  regionOptions = REGION_OPTIONS;


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getAllCountries().subscribe(countries => {
      this.source = countries;
    })
  }

  get countriesFilter(){
    return this.source 
      ? this.source.filter((country) => 
        this.searchFilter 
          ? country.name
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase())
          : country).filter( country => 
                        this.regionFilter
                        ? country.region.includes(this.regionFilter)
                        : country
                        )
        : this.source
  }

}