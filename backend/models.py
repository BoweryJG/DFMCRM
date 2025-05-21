from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship

from .database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, index=True)
    type = Column(String, index=True)
    units = relationship("Unit", back_populates="property")

class Unit(Base):
    __tablename__ = "units"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"))
    unit_number = Column(String, index=True)
    tenants = relationship("Tenant", back_populates="unit")
    property = relationship("Property", back_populates="units")

class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    unit_id = Column(Integer, ForeignKey("units.id"))
    name = Column(String, index=True)
    phone = Column(String, index=True)
    email = Column(String, index=True)
    lease_start = Column(Date)
    lease_end = Column(Date)
    rent = Column(Float)
    unit = relationship("Unit", back_populates="tenants")
    maintenance_issues = relationship("MaintenanceIssue", back_populates="tenant")

class MaintenanceIssue(Base):
    __tablename__ = "maintenance_issues"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    description = Column(String, index=True)
    status = Column(String, default="open")
    tenant = relationship("Tenant", back_populates="maintenance_issues")
