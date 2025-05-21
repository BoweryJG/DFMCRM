from datetime import date
from pydantic import BaseModel
from typing import Optional, List

class MaintenanceIssueBase(BaseModel):
    description: str
    status: Optional[str] = "open"

class MaintenanceIssueCreate(MaintenanceIssueBase):
    pass

class MaintenanceIssue(MaintenanceIssueBase):
    id: int

    class Config:
        orm_mode = True

class TenantBase(BaseModel):
    name: str
    phone: str
    email: str
    lease_start: date
    lease_end: date
    rent: float

class TenantCreate(TenantBase):
    pass

class Tenant(TenantBase):
    id: int
    maintenance_issues: List[MaintenanceIssue] = []

    class Config:
        orm_mode = True

class UnitBase(BaseModel):
    unit_number: str

class UnitCreate(UnitBase):
    pass

class Unit(UnitBase):
    id: int
    tenants: List[Tenant] = []

    class Config:
        orm_mode = True

class PropertyBase(BaseModel):
    address: str
    type: str

class PropertyCreate(PropertyBase):
    pass

class Property(PropertyBase):
    id: int
    units: List[Unit] = []

    class Config:
        orm_mode = True
