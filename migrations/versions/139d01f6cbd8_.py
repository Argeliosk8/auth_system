"""empty message

Revision ID: 139d01f6cbd8
Revises: 3e9f2e17b0cc
Create Date: 2023-09-16 01:06:55.786416

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '139d01f6cbd8'
down_revision = '3e9f2e17b0cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pw_hash', sa.String(length=80), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_column('pw_hash')

    # ### end Alembic commands ###