from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, crud
from .database import engine, Base, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DFM Properties CRM")

@app.post("/properties/", response_model=schemas.Property)
def create_property(property: schemas.PropertyCreate, db: Session = Depends(get_db)):
    return crud.create_property(db, property)

@app.get("/properties/", response_model=List[schemas.Property])
def read_properties(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_properties(db, skip=skip, limit=limit)

@app.post("/properties/{property_id}/units/", response_model=schemas.Unit)
def create_unit_for_property(property_id: int, unit: schemas.UnitCreate, db: Session = Depends(get_db)):
    return crud.create_unit(db, unit, property_id)

@app.get("/properties/{property_id}/units/", response_model=List[schemas.Unit])
def read_units(property_id: int, db: Session = Depends(get_db)):
    return crud.get_units(db, property_id)

@app.post("/units/{unit_id}/tenants/", response_model=schemas.Tenant)
def create_tenant_for_unit(unit_id: int, tenant: schemas.TenantCreate, db: Session = Depends(get_db)):
    return crud.create_tenant(db, tenant, unit_id)

@app.get("/units/{unit_id}/tenants/", response_model=List[schemas.Tenant])
def read_tenants(unit_id: int, db: Session = Depends(get_db)):
    return crud.get_tenants(db, unit_id)

@app.post("/tenants/{tenant_id}/issues/", response_model=schemas.MaintenanceIssue)
def create_issue_for_tenant(tenant_id: int, issue: schemas.MaintenanceIssueCreate, db: Session = Depends(get_db)):
    return crud.create_issue(db, issue, tenant_id)

@app.get("/tenants/{tenant_id}/issues/", response_model=List[schemas.MaintenanceIssue])
def read_issues(tenant_id: int, db: Session = Depends(get_db)):
    return crud.get_issues(db, tenant_id)
