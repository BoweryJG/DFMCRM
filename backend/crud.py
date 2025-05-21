from sqlalchemy.orm import Session
from . import models, schemas

# Property CRUD

def create_property(db: Session, property: schemas.PropertyCreate):
    db_property = models.Property(address=property.address, type=property.type)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property


def get_properties(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Property).offset(skip).limit(limit).all()


# Unit CRUD

def create_unit(db: Session, unit: schemas.UnitCreate, property_id: int):
    db_unit = models.Unit(**unit.dict(), property_id=property_id)
    db.add(db_unit)
    db.commit()
    db.refresh(db_unit)
    return db_unit


def get_units(db: Session, property_id: int):
    return db.query(models.Unit).filter(models.Unit.property_id == property_id).all()


# Tenant CRUD

def create_tenant(db: Session, tenant: schemas.TenantCreate, unit_id: int):
    db_tenant = models.Tenant(**tenant.dict(), unit_id=unit_id)
    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)
    return db_tenant


def get_tenants(db: Session, unit_id: int):
    return db.query(models.Tenant).filter(models.Tenant.unit_id == unit_id).all()


# Maintenance Issue CRUD

def create_issue(db: Session, issue: schemas.MaintenanceIssueCreate, tenant_id: int):
    db_issue = models.MaintenanceIssue(**issue.dict(), tenant_id=tenant_id)
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue


def get_issues(db: Session, tenant_id: int):
    return db.query(models.MaintenanceIssue).filter(models.MaintenanceIssue.tenant_id == tenant_id).all()
